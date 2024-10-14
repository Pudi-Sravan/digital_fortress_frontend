import Spline from '@splinetool/react-spline/next';

export default function Loader() {
  return (
    <main>
        <div className="whole" style={{height:'100vh',width:'100vw',backgroundColor:'black',display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',zIndex:'2',top:"0",left:"0"}}>
        <Spline
        scene="https://prod.spline.design/4NL9esmD5-VguBGz/scene.splinecode" 
      />
        </div>
      
    </main>
  );
}