import { useState, useEffect } from "react";

interface TypingMessageProps {
  content: string;
  isLatestMessage: boolean;
  onComplete?: () => void;
}

export function TypingMessage({ content, isLatestMessage, onComplete }: TypingMessageProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isLatestMessage && !isComplete) {
      let i = 0;
      const typingSpeed = 12;
      
      const typeInterval = setInterval(() => {
        if (i < content.length) {
          setDisplayedContent(content.slice(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
          onComplete?.();
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    } else if (!isLatestMessage) {
      setDisplayedContent(content);
      setIsComplete(true);
    }
  }, [content, isLatestMessage, isComplete, onComplete]);

  return (
    <div 
      className="leading-relaxed prose prose-gray max-w-none [&>*]:mb-3 [&>*:last-child]:mb-0"
      dangerouslySetInnerHTML={{ 
        __html: displayedContent
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/🔎 \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-blue-700 font-semibold">🔎 $1</div>')
          .replace(/✅ \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-green-700 font-semibold">✅ $1</div>')
          .replace(/📊 \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-purple-700 font-semibold">📊 $1</div>')
          .replace(/⚖️ \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-orange-700 font-semibold">⚖️ $1</div>')
          .replace(/- 🔸 \*\*(.*?)\*\*/g, '<div class="ml-4 mb-1">• <strong>$1</strong>')
          .replace(/\n/g, '<br/>')
      }}
    />
  );
}