const HintComponent = ({ text, image }) => {
  return (
    <>
      <p>{text}</p>
      {image != null && <img src={image} />}
    </>
  )
}

export default HintComponent
