import Spline from '@splinetool/react-spline/next';

export default function Bot() {
  return (
    <main>
        <div className="main" style={{height:"100px",position:"absolute",zIndex:"2"}}>
        <Spline
        scene="https://prod.spline.design/PvOiETRlDbHpkflX/scene.splinecode" 
      />
        </div>
      
    </main>
  );
}
