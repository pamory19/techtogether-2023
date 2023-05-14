import { useEffect, useRef, useState } from "react";
import "../stylesheets/MessageBox.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const BASE_URL = "http://localhost:8080"

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

  const navigate = useNavigate();

  useEffect(() => {
    PROMPTS[conversationStep].forEach((prompt, i) => {
      setTimeout(() => {
        setConvo(prevConvo => [...prevConvo, {
          "role": "assistant",
          "content": prompt
        }])
      }, (i + 1) * 2000);
    });

    setTimeout(() => {
        setIsButtonDisabled(false);
    }, (PROMPTS[conversationStep].length * 2000 )) 
  }, [conversationStep])

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
    <>
    <NavBar />
    <div id="chat" className="container">
      <div className="textbox">
        <div className="header">Tell us about yourself</div>
        <div id="messages">
          {convo.map((text, i) => {
            return <Message key={`msg-${i}`} sender={text.role} content={text.content} />
          }).reverse()}
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsButtonDisabled(true);
          setConvo([...convo, {
            "role": "user",
            "content": document.querySelector("#user-response").value
          }])
          document.querySelector("#user-response").value = ""
          if (conversationStep + 1 < Object.keys(PROMPTS).length) {
            setConversationStep(conversationStep + 1)
          } else {
            setConvo([...convo, {
              "role": "user",
              "content": "Great!  Let me think about which plants would be best for you, this might take a few minutes..."
            }])
            getResults(convo, navigate);
          }
        }}>
          <input type="text" id="user-response"/>
          <button disabled={isButtonDisabled}>Send!</button>
        </form>
      </div>
    </div>
    </>
  )
}

async function getResults(convo, navigate) {
  try {
    let newConvo = [{
      "role": "system",
      "content": "You are a bot called 'GreenThumb', and you are giving advice to somebody who is interested in gardening, but doesn't know much about how to start.  You should give them general advice about gardening in their location, as well as a numbered list of the top 3 plants for them, with explanations about why those plants are best for them.  Your suggestions should be based on information the user gives you about their experience level and location"
    }, ...convo];

    let res = await fetch(`${BASE_URL}/multi/send`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newConvo)
    })

    await statusCheck(res);

    res = await res.json();
    console.log(res);

    navigate('/results', {state: { results: res["data"] }});
    // navigate('/chatroom', { state: "Hello World!" });

  } catch (err) {
    alert("Something went wrong.  Error: " + err);
  }
}

async function statusCheck(res) {
  if (!res.ok) { 
    throw new Error(await res.text());
  }
  return res;
}

export default MessageBox;