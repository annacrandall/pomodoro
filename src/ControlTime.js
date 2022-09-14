import PropTypes from "prop-types"
const ControlTime = ({ time, setTime, type }) => {
  const maxTime = 60 * 60; 
    
  const incrementTime = () => {
    const newTime = time >= maxTime ? maxTime : time + 60;
    setTime(newTime)
    }
 
  const decrementTime = () => {
    const newTime = time <= 60 ? 60 : time - 60; 
    setTime(newTime) 
  }
  

    return (
      <div className="m-10 p-5 border-2 border-stone-400 rounded" id={`${type}-container`}>

        <h2 className="uppercase font-mono text-center" id={`${type}-label`}>{type}
          <p id={`${type}-length`}>{time/60}</p>
        </h2>

        <div className="flex flex-row m-1 px-2">
          <button className="hover:bg-stone-900 border-2 border-black hover:text-white rounded p-1 font-mono" id={`${type}-increment`} onClick={incrementTime}>{type} up</button>
          <button className="hover:bg-stone-900 border-2 border-black hover:text-white rounded p-1 font-mono" id={`${type}-decrement`} onClick={decrementTime}>{type} down</button>
        </div> 

      </div>
    )
}
ControlTime.propTypes = {
  time: PropTypes.number.isRequired, 
  setTime: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["session", "break"]).isRequired
}
export default ControlTime;