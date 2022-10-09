from rest_framework import serializers
from authentication.models import CustomUser
from .models import PuzzleModel, SetModel

class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuzzleModel
        fields = ("id", "in_set", "fen", "correct_variations")

class SetCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = SetModel
        fields = ("name",)

class SetSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()

    class Meta: 
        model = SetModel
        fields = ("id", "creator", "name", "last_opened", "amount")

    def get_amount(self, in_set):
        return PuzzleModel.objects.filter(in_set=in_set).__len__()

    def get_creator(self, in_set):
        return in_set.creator.username


class SetSerializerWithPuzzles(serializers.ModelSerializer):
    puzzles = serializers.SerializerMethodField()

    class Meta:
        model = SetModel
        fields = ("id", "creator", "name", "last_opened", "puzzles")

    def get_puzzles(self, in_set):
        puzzles = PuzzleModel.objects.filter(in_set=in_set)

        return PuzzleSerializer(puzzles, many=True).data