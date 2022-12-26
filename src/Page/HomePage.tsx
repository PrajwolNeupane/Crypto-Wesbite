import '../index.css';
import Header from "../Componets/Header";
import Table from "../Componets/Table";

interface Props {

};

let HomePage: React.FC<Props> = ({ }) => {


    return (
       <>
       <Header />
       <Table />
       </>
    )

}
export default HomePage;