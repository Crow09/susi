export default function Msg({params}) {
  console.log(params.id);
  return (
    <center><h2>{params.id}</h2></center>
  )
}