import React, { useEffect ,useState} from 'react';
import jAPI from '../../jejuAPIs/JejuAPIs';
import {Link} from 'react-router-dom';
import {Board,BoardWeb} from '../../components/main';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function Detail(props) {
    const classes = useStyles();
    const changeScreenMode=()=>{
        if(window.screen.width>600){
            return 'web';
        }
        else return 'mobile';
    }
    const [openLoad, setOpenLoad] = useState(false);
    const [screen, setScreen] = useState(changeScreenMode());
    const [message, setMessage] = useState("로딩중");
    const [board, setBoard] = useState(null);

    useEffect(()=>{
        setOpenLoad(true);
        jAPI.get(`/posts/${props.match.params.boardId}`)
        .then(res=>{
            setOpenLoad(false);
            setBoard(res.data);
        })
        .catch(error=>{
            setOpenLoad(false);
            if(error.response!==undefined){
            if(error.response.status===401){
                alert("알수없는 회원정보. 로그아웃시킴");
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("id");
                props.history.push("/sign/in");
            }
            else if(error.response.status===404){
                alert('게시글을 찾을 수 없습니다! 피드로 돌아갑니다.')
                props.history.push("/");
            }
            }   
            else{
            console.log(error);
            setMessage("게시글을 불러오는데 실패했습니다.");
            }
        })
    },[props.match.params.boardId,props.history]);

    useEffect( ()=>{
        window.addEventListener('resize',handleResizeEvent);
        return ()=>{window.removeEventListener('resize',handleResizeEvent);}
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
        <Backdrop className={classes.backdrop} open={openLoad}>
            <span>
                <CircularProgress color="inherit" /> <br/>
                <b>로딩중 ... </b>
            </span>
        </Backdrop>
            {board===null?`id: ${props.match.params.boardId} ${message}`:
                screen==="mobile"?
                    <Board board={board}/>
                    :<BoardWeb board={board}/>
            }
        </>
    );
}

export default Detail;