import { useEffect, useRef, useState } from "react";
import "../stylesheets/MessageBox.css";

const PROMPTS = [
  [
    "Hi!  I'm GreenThumb, I'm here to tell you all about the perfect garden for YOU.",
    "I'll use information you tell me to match you with your perfect plants.",
    "First- can you tell me where you're from?"
  ],
  [
    "Great!  About how much time are you able/willing to devote to your plant?",
  ],
  [
    "Okay!  How you ever had any plants die in the past?"
  ],
  [
    "Almost done!  Finally - do you have any idea about the kind of plants you want to grow?"
  ]
]

function MessageBox() {
  const [conversationStep, setConversationStep] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [convo, setConvo] = useState([]);

  useEffect(() => {
    PROMPTS[conversationStep].forEach((prompt, i) => {
      setTimeout(() => {
        setConvo(prevConvo => [...prevConvo, {
          "role": "assistant",
          "message": prompt
        }])
      }, i * 2000);
    });

    setTimeout(() => {
        setIsButtonDisabled(false);
    }, (PROMPTS[conversationStep].length * 2000 )- 2000)
  }, [conversationStep])

  console.log(convo);

  function Message({sender, content}) {
    return (
      <div className={`chat ${sender}-message`}>
        <p><strong>{sender}</strong></p>
        <p>
          {content}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div>
        {convo.map((text, i) => {
          return <Message key={`msg-${i}`} sender={text.role} content={text.message} />
        })}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setIsButtonDisabled(true);
        setConvo([...convo, {
          "role": "user",
          "message": document.querySelector("#user-response").value
        }])
        document.querySelector("#user-response").value = ""

        if (conversationStep + 1 < Object.keys(PROMPTS).length) {
          setConversationStep(conversationStep + 1)
        } else {
          getResults(convo);
        }
      }}>
        <input type="text" id="user-response"/>
        <button disabled={isButtonDisabled}>Send!</button>
      </form>
    </div>
  )
}

async function getResults(convo) {
  try {
    console.log(convo);
  } catch (err) {
    alert("Something went wrong.  Error: " + err);
  }
}

export default MessageBox;