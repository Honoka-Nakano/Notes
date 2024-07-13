from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Note, Tag
from .serializers import NoteSerializer, TagSerializer
# TagCreateSerializer

# 投稿一覧を提供するAPIビュー
class NotesView(ListAPIView):
    # 更新日時で並び替え
    # queryset = Note.objects.all().order_by('-updated_at')
    serializer_class = NoteSerializer
    # どのユーザでもアクセス可能
    # permission_classes = (AllowAny,)
    permission_classes = (IsAuthenticated,)

    # 変更，認証取得しているユーザのみの投稿を表示
    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by('-updated_at')

# 特定の投稿の詳細を提供するAPIビュー
class NoteDetailView(RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    # どのユーザでもアクセス可能
    # permission_classes = (AllowAny,)
    permission_classes = (IsAuthenticated,)
    # 投稿を識別するためにuidフィールドを使用
    lookup_field = 'uid'

# 新規投稿，投稿編集，投稿削除を行うAPIビューセット
class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    # 投稿を識別するためにuidフィールドを使用
    lookup_field = 'uid'
    # 変更
    permission_classes = (IsAuthenticated,)

    # 新規投稿時のユーザ情報の保存処理
    def perform_create(self, serializer, **kwargs):
        # 投稿を作成するユーザを設定
        # serializer.save(user=self.request.user)
        note = serializer.save(user=self.request.user)
        tags_data = self.request.data.get('tags', [])
        if tags_data:
            for tag_id in tags_data:
                try:
                    tag = Tag.objects.get(id=tag_id)
                    note.tags.add(tag)
                except Tag.DoesNotExist:
                    pass
            note.save()

# 追加
# タグ
class TagsView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (IsAuthenticated,)
# タグの作成，編集，削除を行うAPIビューセット
class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    # serializer_class = TagCreateSerializer
    serializer_class = TagSerializer
    permission_classes = (IsAuthenticated,)
# ここまで
