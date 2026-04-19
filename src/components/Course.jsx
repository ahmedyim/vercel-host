function Course(props) {
  return (
    <div>
      <li>{props.course1}</li>
      <li>{props.course2}</li>
      <li>{props.course3}</li>
      <li>{props.course4}</li>
      <li>{props.course5}</li>
      <li>{props.course6}</li>
    </div>
  )
}
export default Course;
  // const sendSenderMessage = () => {
  //   if (!senderText.trim() || !selectedId) return;

  //   const newMessage = {
  //     id: Date.now(),
  //     content: senderText,
  //     time: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     senderId: 10,
  //     reciverId: selectedId,
  //   };

  //   setMessages((prev) => ({
  //     ...prev,
  //     [selectedId]: [...(prev[selectedId] || []), newMessage],
  //   }));

  //   setdisplayMessages((prev) => [...prev, newMessage]);

  //   setSenderText("");
  // };
  // const sendMessage = () => {
  //   const id = displayMessages.length + 1;
  //   let h = now.getHours();
  //   let m = now.getMinutes();
  //   let time = h + "" + m;
  //   let message = {
  //     id,
  //     content: text,
  //     time,
  //     senderId: 10,
  //     reciverId: selectedId,
  //   };
  //   setdisplayMessages((prev) => ({
  //     ...prev,
  //     [selectedId]: [...(prev[selectedId] || []), newMessage],
  //   }));
  //   setdisplayMessages((prev) => [...prev, newMessage]);
  // };
  // let isLoggedin = true;
  // const [message, setMessage] = useState([]);
  // setTimeout(() => {
  //   setMessage([{ id: 1, content: "hello" }]);
  //   // console.log(message)
  // }, 2000);
  // useEffect(() => {
  //   // console.log("test")
  // }, [message]);
  // useEffect(() => {
  //   async function fetchComments() {
  //     let response = fetch("http://localhost:4000/api/messages");
  //     let data= await response.json()
  //     console.log(response);
  //     console.log(data);
  //   }
  //   fetchComments()
  // },[]);
  return (
    <div>
      {/* <Header logo="Mizan Logo" isLoggedin={isLoggedin} /> */}
      {/* <Hero isLoggedin={isLoggedin} />
      <Registration/>
      {/* <Course
        course1="Digital marketing"
        course2="Graphics Design"
        course3="FullStack"
        course4="Mobile App"
        course5="Python"
      /> */}
      {/* <Message/> */}
      {/* <Footer link="Home" /> */}
      {/* <AddToCart/> */}
      {/* <Counter/>
      <Footer>
        <div>&copy; 2023 My Website. All rights reserved.</div>
        </Footer> */}
        <Layout sidebar={<SideBar/>} header={<Header/>}/>
    </div>
  );