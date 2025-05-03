from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Card, CardImage, County
from .serializers import CategorySerializer, CardSerializer, CardImageSerializer, CountySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.prefetch_related("images", "category").all()
    serializer_class = CardSerializer

    @action(detail=True, methods=["post"], url_path="upload-images")
    def upload_images(self, request, pk=None):
        card = self.get_object()
        serializer = CardImageSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        images = []
        for image_data in serializer.validated_data:
            images.append(CardImage(card=card, **image_data))

        CardImage.objects.bulk_create(images)
        return Response(CardImageSerializer(images, many=True).data, status=201)


class CardImageViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = CardImageSerializer

    def get_queryset(self):
        return CardImage.objects.filter(card_id=self.kwargs["card_pk"])

    def get_serializer_context(self):
        return {"card_id": self.kwargs["card_pk"]}


class CountyViewSet(viewsets.ModelViewSet):
    queryset = County.objects.prefetch_related("cards").all()
    serializer_class = CountySerializer

    @action(detail=True, methods=["post", "delete"], url_path="cards/(?P<card_id>\d+)")
    def manage_card(self, request, pk=None, card_id=None):
        county = self.get_object()
        try:
            card = Card.objects.get(pk=card_id)
        except Card.DoesNotExist:
            return Response({"error": "Card not found"}, status=404)

        if request.method == "POST":
            county.cards.add(card)
            return Response({"status": "card added"})
        elif request.method == "DELETE":
            county.cards.remove(card)
            return Response({"status": "card removed"})
