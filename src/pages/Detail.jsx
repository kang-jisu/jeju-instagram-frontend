import React, { useEffect ,useState} from 'react';
import jAPI from '../jejuAPIs/JejuAPIs';
import {Link} from 'react-router-dom';
import {Board,BoardWeb} from '../components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
function Detail(props) {
    const changeScreenMode=()=>{
        if(window.screen.width>600){
            return 'web';
        }
        else return 'mobile';
    }
    const [screen, setScreen] = useState(changeScreenMode());
    const [message, setMessage] = useState("로딩중");
    const [board, setBoard] = useState(null);

    useEffect(()=>{
        jAPI.get(`/boards/${props.match.params.boardId}`)
        .then(res=>{
            setBoard(res.data);
        })
        .catch(error=>{
            console.log(error);
            setMessage("게시글을 불러오는데 실패했습니다.");
        })
    },[props.match.params.boardId]);

    useEffect( ()=>{
        window.addEventListener('resize',handleResizeEvent);
    });

    const handleResizeEvent=()=>{
        setScreen(changeScreenMode());
    }
    const goBack=()=>{
        props.history.goBack();
    }

    return (
        <>
        <div className="nav-bar header">
            <div className="nav-block">
                <Link to="#" onClick={goBack}><ArrowBackIosIcon/></Link>
            </div>
            <div className="nav-block">
                <span  >사진</span>
            </div>
            <div className="nav-block">
            </div>
        </div>
            {board===null?`id: ${props.match.params.boardId} ${message}`:
                screen==="mobile"?
                    <Board board={board}/>
                    :<BoardWeb board={board}/>
            }
        </>
    );
}

export default Detail;