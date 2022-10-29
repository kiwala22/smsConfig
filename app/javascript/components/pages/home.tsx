import React from "react";

interface AppProps {
  arg: string
}

const Home = ({ arg }: AppProps) => {
  return <div>{arg}</div>
};


export default Home