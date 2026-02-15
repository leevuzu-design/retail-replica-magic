import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import { useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, ImagePlus, Palette, Undo, Redo,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const uploadImage = async (file: File): Promise<string> => {
  const ext = file.name.split('.').pop() || 'png';
  const path = `desc-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('product-images').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
};

const MenuBar = ({ editor }: { editor: any }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(async (files: FileList | null) => {
    if (!files || !editor) return;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const url = await uploadImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (e: any) {
        toast({ title: 'Lỗi upload ảnh', description: e.message, variant: 'destructive' });
      }
    }
  }, [editor]);

  if (!editor) return null;

  const btnCls = (active?: boolean) =>
    `p-1.5 rounded hover:bg-accent transition-colors ${active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border p-1.5 bg-secondary/30">
      <button type="button" className={btnCls(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()} title="In đậm">
        <Bold className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()} title="In nghiêng">
        <Italic className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive('underline'))} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Gạch chân">
        <UnderlineIcon className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive('strike'))} onClick={() => editor.chain().focus().toggleStrike().run()} title="Gạch ngang">
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button type="button" className={btnCls(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Tiêu đề H1">
        <Heading1 className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Tiêu đề H2">
        <Heading2 className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Tiêu đề H3">
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button type="button" className={btnCls(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Danh sách">
        <List className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Danh sách đánh số">
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button type="button" className={btnCls(editor.isActive({ textAlign: 'left' }))} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Căn trái">
        <AlignLeft className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive({ textAlign: 'center' }))} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Căn giữa">
        <AlignCenter className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls(editor.isActive({ textAlign: 'right' }))} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Căn phải">
        <AlignRight className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button type="button" className={btnCls()} onClick={() => colorRef.current?.click()} title="Màu chữ">
        <Palette className="w-4 h-4" />
      </button>
      <input
        ref={colorRef}
        type="color"
        className="sr-only"
        onChange={e => editor.chain().focus().setColor(e.target.value).run()}
      />

      <button type="button" className={btnCls()} onClick={() => fileRef.current?.click()} title="Chèn ảnh">
        <ImagePlus className="w-4 h-4" />
      </button>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleImageUpload(e.target.files)} />

      <div className="w-px h-5 bg-border mx-1" />

      <button type="button" className={btnCls()} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Hoàn tác">
        <Undo className="w-4 h-4" />
      </button>
      <button type="button" className={btnCls()} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Làm lại">
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: placeholder || 'Nhập mô tả sản phẩm...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[200px] p-3 focus:outline-none',
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of Array.from(items)) {
          if (item.type.startsWith('image/')) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              uploadImage(file).then(url => {
                view.dispatch(view.state.tr.replaceSelectionWith(
                  view.state.schema.nodes.image.create({ src: url })
                ));
              }).catch(e => {
                toast({ title: 'Lỗi paste ảnh', description: e.message, variant: 'destructive' });
              });
            }
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (!files?.length) return false;
        const hasImage = Array.from(files).some(f => f.type.startsWith('image/'));
        if (!hasImage) return false;
        event.preventDefault();
        Array.from(files).forEach(file => {
          if (!file.type.startsWith('image/')) return;
          uploadImage(file).then(url => {
            const { pos } = view.posAtCoords({ left: event.clientX, top: event.clientY }) || { pos: view.state.doc.content.size };
            view.dispatch(view.state.tr.insert(pos, view.state.schema.nodes.image.create({ src: url })));
          }).catch(e => {
            toast({ title: 'Lỗi drop ảnh', description: e.message, variant: 'destructive' });
          });
        });
        return true;
      },
    },
  });

  return (
    <div className="border border-border rounded-md overflow-hidden bg-background">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
