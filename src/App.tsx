import "./App.css";
import MessageInput from "./MessageInput/MessageInput.tsx";
import MessageList from "./MessageList/MessageList";
import Header from "./Header/Header";
import { respond } from "./Blinkbot/respond";
import "./Blinkbot.css";
import { useMessages } from "./hooks/useMessages.ts";
import { asyncTimeout } from "./utils/asyncTimeout.ts";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.tsx";

function App() {
  const { messages, addMessage, resetMessages } = useMessages();

  const handleUserMessage = async (message: string) => {
    addMessage({ text: message, user: "Human", isCurrentUser: true });

    await asyncTimeout(250);

    const botResponse = await respond(message).catch(
      (error) => `I had a problem: ${error.message}`,
    );

    addMessage({ text: botResponse, user: "Blinkbot", isCurrentUser: false });
  };

  return (
    <div className={"App"}>
      <div className={"App__headerContainer"}>
        <Header onReset={resetMessages} />
      </div>
      <ErrorBoundary>
        <MessageList messages={messages} />
      </ErrorBoundary>
      <div className={"App__messageInputContainer"}>
        <MessageInput onMessage={handleUserMessage} />
      </div>
    </div>
  );
}

export default App;
