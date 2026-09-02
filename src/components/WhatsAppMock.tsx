type Message = { from: "them" | "me"; text: string; time: string };

export default function WhatsAppMock({
  contact,
  status = "en línea",
  avatar,
  messages,
}: {
  contact: string;
  status?: string;
  avatar: string;
  messages: Message[];
}) {
  return (
    <div className="waWindow">
      <div className="waHeader">
        <span className="waAvatar">{avatar}</span>
        <div>
          <strong>{contact}</strong>
          <span>{status}</span>
        </div>
      </div>
      <div className="waBody">
        {messages.map((m, i) => (
          <div key={i} className={`waBubble ${m.from === "me" ? "waBubbleOut" : "waBubbleIn"}`}>
            <span>{m.text}</span>
            <time>{m.time}</time>
          </div>
        ))}
      </div>
    </div>
  );
}
