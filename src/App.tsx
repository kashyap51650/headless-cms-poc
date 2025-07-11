import { PublishEvent } from "./components/PublishEvent";

function App() {
  const handleEventSubmit = (data: any) => {
    console.log("Event submitted:", data);
    // Here you would typically send the data to your backend
    alert("Event published successfully!");
  };

  return (
    <div className="App">
      <PublishEvent onSubmit={handleEventSubmit} isLoading={false} />
    </div>
  );
}

export default App;
