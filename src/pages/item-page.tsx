import { useParams } from 'react-router';

type Props = {};
export default function ItemPage({}: Props) {
    const { id } = useParams<{ id: string }>();

    return <div>ItemPage of {id} </div>;
}
