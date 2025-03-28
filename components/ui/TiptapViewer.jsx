// components/ui/TiptapViewer.jsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TiptapViewer({ content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false, // mode read-only
  });

  return (
    <div className="prose max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}
