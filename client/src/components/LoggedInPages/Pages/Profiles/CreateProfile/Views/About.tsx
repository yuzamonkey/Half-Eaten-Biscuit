const About = ({ text, setText }: any) => {
  return (
    <div className="write-about-me-text-container">
      <h2>Tell about yourself</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
      >
      </textarea>
    </div>
  )
}

export default About