const NameAndImage = ({ groupName, setGroupName, image, setImage }) => {

  const handleImageChange = (event) => {

    if (event.target.files && event.target.files[0]) {
      console.log("FILE SIZE", event.target.files[0].size)
      if (event.target.files[0].size >= 1000000) {
        console.log("IMAGE TOO LARGE")
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(String(event?.target?.result));
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  return (
    <div>
      <h1>Name and image component</h1>
      <input value={groupName} onChange={e => setGroupName(e.target.value)}></input>
      <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={e => handleImageChange(e)}></input>
    </div>
  )
}

export default NameAndImage