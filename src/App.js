import { useState } from "react";

const LANGUAGES = [
  { value: "Uzbek", label: "O'zbek" },
  { value: "English", label: "Ingliz" },
  { value: "Russian", label: "Rus" },
  { value: "Turkish", label: "Turk" },
  { value: "Arabic", label: "Arab" },
  { value: "Chinese", label: "Xitoy" },
  { value: "German", label: "Nemis" },
  { value: "French", label: "Frantsuz" },
  { value: "Spanish", label: "Ispan" },
  { value: "Japanese", label: "Yapon" },
  { value: "Korean", label: "Koreys" },
  { value: "Italian", label: "Italyan" },
  { value: "Portuguese", label: "Portugalcha" },
  { value: "Hindi", label: "Hind" },
  { value: "Persian", label: "Fors" },
];

export default function App() {
  const [fromLang, setFromLang] = useState("Uzbek");
  const [toLang, setToLang] = useState("English");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const swap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(result);
    setResult(inputText);
  };

  const translate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Translate the following text from ${fromLang} to ${toLang}. Return ONLY the translation, nothing else:\n\n${inputText}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text =
        data.choices?.[0]?.message?.content || "Xatolik yuz berdi.";
      setResult(text);
    } catch (e) {
      setResult("Tarjimada xatolik yuz berdi.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            🌐 Tarjimon
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>15+ til qo'llab-quvvatlanadi</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}
            style={{ flex: 1, padding: "10px 12px", borderRadius: "10px", border: "1px solid #333", background: "#1a1a1a", color: "#fff", fontSize: "14px", cursor: "pointer" }}>
            {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>

          <button onClick={swap}
            style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #333", background: "#1a1a1a", color: "#888", cursor: "pointer", fontSize: "18px", flexShrink: 0 }}>
            ⇄
          </button>

          <select value={toLang} onChange={(e) => setToLang(e.target.value)}
            style={{ flex: 1, padding: "10px 12px", borderRadius: "10px", border: "1px solid #333", background: "#1a1a1a", color: "#fff", fontSize: "14px", cursor: "pointer" }}>
            {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>

        <textarea value={inputText} onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.ctrlKey && e.key === "Enter" && translate()}
          placeholder="Tarjima qilmoqchi bo'lgan matnni kiriting... (Ctrl+Enter)"
          style={{ width: "100%", minHeight: "140px", padding: "14px", borderRadius: "12px", border: "1px solid #333", background: "#1a1a1a", color: "#fff", fontSize: "15px", fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: "1.6", marginBottom: "10px" }} />

        <button onClick={translate} disabled={loading || !inputText.trim()}
          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", background: loading ? "#333" : "#2563eb", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", marginBottom: "10px", transition: "background 0.2s" }}>
          {loading ? "⏳ Tarjima qilinmoqda..." : "→ Tarjima qilish"}
        </button>

        <div style={{ position: "relative", minHeight: "140px", padding: "14px", borderRadius: "12px", border: "1px solid #333", background: "#1a1a1a" }}>
          {result ? (
            <>
              <p style={{ color: "#fff", fontSize: "15px", lineHeight: "1.6", margin: 0, paddingRight: "80px" }}>{result}</p>
              <button onClick={copy}
                style={{ position: "absolute", top: "10px", right: "10px", padding: "5px 10px", borderRadius: "8px", border: "1px solid #444", background: "#2a2a2a", color: "#aaa", fontSize: "12px", cursor: "pointer" }}>
                {copied ? "✓ Nusxalandi" : "📋 Nusxa"}
              </button>
            </>
          ) : (
            <p style={{ color: "#555", fontSize: "15px", margin: 0 }}>Tarjima shu yerda ko'rinadi...</p>
          )}
        </div>
      </div>
    </div>
  );
}
