import { useParams } from 'react-router';

type Props = {};
export default function EditPage({}: Props) {
    const { id } = useParams<{ id: string }>();

    return <div>EditPage of {id}</div>;
}
