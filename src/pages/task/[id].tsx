import Head from "next/head";
import styles from "./styles.module.css"
import { GetServerSideProps } from "next";
import { db } from "@/src/services/firebaseConnection";
import { deleteDoc, doc, collection, query, where, getDoc, addDoc, getDocs } from "firebase/firestore";
import { Textarea } from "@/src/components/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession} from "next-auth/react";
import { FaTrash } from "react-icons/fa";
interface TaskProps{
    item: {
        tarefa: string,
        public: boolean,
        created: string,
        user: string,
        taskId: string
    };
    allComments: CommentProps[]
}

interface CommentProps{
    id: string,
    comment: string,
    taskId: string,
    user: string,
    name: string
}
export default function Task({ item, allComments}: TaskProps){
    const {data: session} = useSession()
    const [input, setInput] = useState('')
    const [comments, setComments] = useState<CommentProps[]>(allComments || [])
    async function handleComment(event: FormEvent){
        event.preventDefault()

        if(input === "") return
        
        if(!session?.user?.email || !session?.user?.name) return

        try{
            const docRef = await addDoc(collection(db, "comments"), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            })

            const data = {
                id: docRef.id,
                comment: input,
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            }

            setComments((oldItems) => [...oldItems, data])

            setInput("")
        } catch(err) {
            console.log(err)
        }
    }

    async function handleDeleteComment(id: string){
        try{
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef);
            const deletComment = comments.filter((item)=> item.id !== id)
            setComments(deletComment)
        } catch(err) {

        }
    }
    return(
        <div className={styles.container}>
            <Head>
                <title>Tarefa - Detalhes da tarefa</title>
            </Head>

            <main className={styles.main}>
                <h1>Tarefa</h1>
                <article className={styles.task}>
                    <p>
                        {item.tarefa}
                    </p>
                </article>
            </main>

            <section className={styles.commentsContainer}>
                <h2>Deixar Comentário</h2>
                <form onSubmit={handleComment}>
                    <Textarea 
                    value={input}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                    placeholder="Deixe seu comentário..."/>
                    <button type="submit" disabled={!session?.user} className={styles.button}>Enviar Comentário</button>
                </form>
            </section>

            <section className={styles.commentsContainer}>
                <h2>Todos comentários</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentário foi encontrado...</span>
                )}

                {comments.map((item) => (
                    <article className={styles.comment}>
                        <div className={styles.headComment}>
                            <label htmlFor="" className={styles.commentsLabel}>{item.name}</label>
                            {item.user === session?.user?.email && (
                                <button onClick={() => handleDeleteComment(item.id)} className={styles.buttonTrash}>
                                    <FaTrash 
                                    size={18}
                                    color="#ea3140"/>
                                </button>
                            )}

                        </div>
                        <p>{item.comment}</p>
                    </article>
                ))}

            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const id = params?.id as string

    const docRef = doc(db, "tarefas", id)

    const q = query(collection(db, "comments"), where("taskId", "==", id))
    const snapshotCommnets = await getDocs(q)

    let allComments: CommentProps[] = []

    snapshotCommnets.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId
        })
    })

    console.log(allComments)
    const snapshot = await getDoc(docRef)

    if(snapshot.data() === undefined){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    if(!snapshot.data()?.public){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000

    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id
    }

    return{
        props: {
            item: task,
            allComments: allComments
        }
    }
}