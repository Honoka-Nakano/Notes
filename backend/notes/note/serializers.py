from rest_framework import serializers
from accounts.serializers import UserSerializer
from notes.utils import Base64ImageField
from note.models import Note, Tag

# 追加
# タグのシリアライザー
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
# ここまで

# 投稿のシリアライザー
class NoteSerializer(serializers.ModelSerializer):
    # uidフィールドは読み取り専用
    uid = serializers.CharField(read_only=True)
    # Userモデルのシリアライザーを組み込み（読み取り専用）
    user = UserSerializer(read_only=True)
    # Base64エンコードされた画像を受け入れるカスタムフィールド
    image = Base64ImageField(
        max_length=None, use_url=True, required=False, allow_null=True
    )
    # 追加
    # タグのシリアライザーを読み込む
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Tag.objects.all(), source='tags', required=False, allow_null=True
    )

    class Meta:
        model = Note
        fields = '__all__'
    # ここまで

# 追加
# タグの作成，編集，削除用シリアライザー
# class TagCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Tag
#         fields = ['id', 'name']
# ここまで
