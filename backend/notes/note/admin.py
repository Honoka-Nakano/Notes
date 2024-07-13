from django.contrib import admin
from django.contrib.admin import ModelAdmin
from note.models import Note, Tag

class NoteCustom(ModelAdmin):
    # 一覧
    list_display = ('uid', 'user', 'title', 'get_tags', 'updated_at', 'created_at')
    # リンク
    list_display_links = ('uid', 'user', 'title')
    # 順番
    ordering = ('-updated_at',)
    # 編集不可
    readonly_fields = ('uid', 'updated_at', 'created_at')
    # 追加
    # タグをカスタムメソッドで取得
    def get_tags(self, obj):
        return ', '.join([tag.name for tag in obj.tags.all()])

    get_tags.shortdescription = 'Tags'
    # ここまで

admin.site.register(Note, NoteCustom)
# 追加
admin.site.register(Tag)
# ここまで
