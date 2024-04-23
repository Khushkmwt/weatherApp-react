import Weather from "./components/Weather";
import bg from "./assets/nature.jpg";
// import bg from "./assets/bg.avif";

function App() {
  return (
    <>
      <h1 className="bg-sky-500 text-4xl h-12 flex content-center justify-center">Weather App</h1>
      <div
        className="flex justify-center "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Weather />
      </div>
    </>
  );
}

export default App;
