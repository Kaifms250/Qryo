import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";

interface TypingIndicatorProps {
  typingUsers: string[];
  recordingUsers: string[];
}

export function TypingIndicator({ typingUsers, recordingUsers }: TypingIndicatorProps) {
  const allUsers = [...typingUsers, ...recordingUsers];
  if (allUsers.length === 0) return null;

  const typingText =
    typingUsers.length === 1
      ? `${typingUsers[0]} is typing`
      : typingUsers.length === 2
      ? `${typingUsers[0]} and ${typingUsers[1]} are typing`
      : typingUsers.length > 2
      ? `${typingUsers[0]} and ${typingUsers.length - 1} others are typing`
      : null;

  const recordingText =
    recordingUsers.length === 1
      ? `${recordingUsers[0]} is recording`
      : recordingUsers.length === 2
      ? `${recordingUsers[0]} and ${recordingUsers[1]} are recording`
      : recordingUsers.length > 2
      ? `${recordingUsers[0]} and ${recordingUsers.length - 1} others are recording`
      : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className="flex items-center gap-3 px-4 py-1"
      >
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            {typingText && <span className="text-xs text-muted-foreground">{typingText}</span>}
          </div>
        )}
        {recordingUsers.length > 0 && (
          <div className="flex items-center gap-2">
            <Mic className="h-3 w-3 text-destructive animate-pulse" />
            {recordingText && <span className="text-xs text-muted-foreground">{recordingText}</span>}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
