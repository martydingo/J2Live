"use client";

import { shikiToMonaco } from "@shikijs/monaco/index.mjs";
import { useRef } from "react";
import { createHighlighter, ThemeRegistration } from "shiki/index.mjs";
import shiki_halcyon from "../../../styles/themes/shiki-halcyon";
import Editor from "@monaco-editor/react";
import defineMonacoJinjaLanguage from "./JinjaLanguageDefinition";
import "./JinjaEditor.css";
import monaco_theme_halcyon from "../../../styles/themes/monaco/monaco-halcyon";

export default function JinjaEditor({
  editorData,
  handleEditorChange,
}: {
  editorData: {
    YAMLEditor: string;
    JinjaEditor: string;
  };
  handleEditorChange: (editorName: any, editorContent: any) => void;
}) {
  const editorRef = useRef(null);

  /* eslint @typescript-eslint/no-explicit-any: 0 */
  function handleEditorDidMount(editor: any, monaco: any) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;

    defineMonacoJinjaLanguage(monaco);

    const highlighter = createHighlighter({
      themes: [shiki_halcyon] as ThemeRegistration[],
      langs: ["jinja"],
    });

    Promise.all([highlighter]).then(([highlighter]) => {
      shikiToMonaco(highlighter, monaco);
    });

    monaco_theme_halcyon();
    monaco.editor.setTheme("Halcyon");
    editor.updateOptions({
      fontSize: 14,
    });
  }

  return (
    <>
      <label
        className="m_8fdc1311 mantine-InputWrapper-label mantine-Textarea-label"
        data-size="md"
        id="JinjaEditor-label"
      >
        Jinja2 Template
      </label>
      <p
        className="JinjaEditor m_fe47ce59 mantine-InputWrapper-description mantine-Textarea-description"
        data-size="md"
        id="JinjaEditor-description"
      >{`e.g. {{ some_var }}`}</p>
      <Editor
        height="90vh"
        defaultLanguage="jinja"
        value={editorData.JinjaEditor}
        onMount={handleEditorDidMount}
        onChange={(editorContent) => handleEditorChange("JinjaEditor", editorContent!)}
      />
    </>
  );
}
