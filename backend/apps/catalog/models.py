from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=50, verbose_name="Категория")

    def __str__(self):
        return self.title


class Card(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    count = models.PositiveSmallIntegerField(default=0)
    maps = models.CharField(max_length=50, blank=True, null=True)
    category = models.ManyToManyField(
        Category,
        blank=True,
        related_name="cards",
        verbose_name="Категория",
    )

    def __str__(self):
        return self.title or "Без названия"

    @property
    def main_image(self):
        return self.images.first()


class CardImage(models.Model):
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, related_name="images", verbose_name="Карточка"
    )
    image = models.ImageField(
        upload_to="images/cards/%Y/%m/%d/", verbose_name="Изображение"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")
    is_main = models.BooleanField(default=False, verbose_name="Основное изображение")

    class Meta:
        ordering = ["order"]
        verbose_name = "Изображение карточки"
        verbose_name_plural = "Изображения карточки"

    def __str__(self):
        return f"Изображение для {self.card.title}"

    def save(self, *args, **kwargs):
        if self.is_main:
            CardImage.objects.filter(card=self.card).exclude(pk=self.pk).update(
                is_main=False
            )
        super().save(*args, **kwargs)
