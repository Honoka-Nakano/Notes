from django.urls import path, include
from rest_framework import routers
from note import views

router = routers.DefaultRouter()
router.register('notes', views.NoteViewSet)
router.register('tags', views.TagViewSet)

urlpatterns = [
    # 投稿一覧
    path('all-notes/', views.NotesView.as_view()),
    # 投稿詳細
    path('note-detail/<uid>/', views.NoteDetailView.as_view()),
    # 新規，編集，削除
    path('', include(router.urls)),
    # 追加
    # タグ一覧，作成，編集，削除
    path('tags/', views.TagsView.as_view())
    # ここまで
]
