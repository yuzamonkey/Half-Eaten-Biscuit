const About = ({text, setText}: any) => {
  return (
    <div>
      <h3>About mon</h3>
      <textarea 
      value={text} 
      onChange={e => setText(e.target.value)}
      cols={50}
      rows={30}
      >
      </textarea>
    </div>
  )
}

export default About