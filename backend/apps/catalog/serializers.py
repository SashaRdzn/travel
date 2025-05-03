from rest_framework import serializers
from .models import Category, Card, CardImage, County


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "title"]


class CardImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardImage
        fields = ["id", "image", "order", "is_main"]


class CardSerializer(serializers.ModelSerializer):
    images = CardImageSerializer(many=True, read_only=True)
    categories = CategorySerializer(source="category", many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = Card
        fields = [
            "id",
            "title",
            "text",
            "address",
            "count",
            "maps",
            "categories",
            "category_ids",
            "images",
        ]

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        categories = validated_data.pop("category", [])

        card = Card.objects.create(**validated_data)
        card.category.set(categories)

        for image_data in images_data:
            CardImage.objects.create(card=card, **image_data)

        return card

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", None)
        categories = validated_data.pop("category", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if categories is not None:
            instance.category.set(categories)

        instance.save()

        if images_data is not None:
            instance.images.all().delete()
            for image_data in images_data:
                CardImage.objects.create(card=instance, **image_data)

        return instance


class CountySerializer(serializers.ModelSerializer):
    # For reading - show full card data
    cards = CardSerializer(many=True, read_only=True)

    # For writing - accept card IDs
    card_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Card.objects.all(),
        source="cards",
        write_only=True,
        required=False,
    )

    class Meta:
        model = County
        fields = ["id", "title", "description", "cards", "card_ids"]

    def create(self, validated_data):
        cards_data = validated_data.pop("cards", [])
        county = County.objects.create(**validated_data)
        county.cards.set(cards_data)
        return county

    def update(self, instance, validated_data):
        cards_data = validated_data.pop("cards", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if cards_data is not None:
            instance.cards.set(cards_data)

        instance.save()
        return instance
