const About = ({ text, setText }: any) => {
  return (
    <div className="group-about-container">
      <h2 className="secondary-text">Describe your group</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        cols={50}
        rows={20}
      >
      </textarea>
    </div>
  )
}

export default About