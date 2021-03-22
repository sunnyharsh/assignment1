const Button=({className, onClick, BtnValue})=>{
    return (
        <button className={`btn btn-${className}`} onClick={onClick}>{BtnValue}</button>
    )
}
export default Button;