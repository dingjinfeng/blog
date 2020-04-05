package WebSocket.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.LetterMsg;
import domain.LetterNoRead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import service.LetterMsgService;
import utils.SessionData;

@Component
public class LetterMsgTransportWebSocketHandler extends TextWebSocketHandler {
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private LetterMsgService letterMsgService;
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String msg = message.getPayload();
        try{
            LetterMsg letterMsg=mapper.readValue(msg, LetterMsg.class);
            letterMsgService.addChatroomMsg(letterMsg);
            letterMsg = letterMsgService.queryLetterMsgByLetterMsgId(letterMsg.getId());
            WebSocketSession toSession = SessionData.getLettermsg_socket().get(letterMsg.getToUserId());
            if(toSession!=null) {
                toSession.sendMessage(new TextMessage(mapper.writeValueAsString(letterMsg)));
            }
            if(SessionData.getNoRead_user_socket().get(letterMsg.getToUserId()) != null){
                int allnums=letterMsgService.queryNoReadLetterMsgByUserId(letterMsg.getToUserId());
                SessionData.getNoRead_user_socket().get(letterMsg.getToUserId()).sendMessage(new TextMessage(allnums+""));
            }
            if(SessionData.getNoRead_letter_socket().get(letterMsg.getLetterId()+"-"+letterMsg.getToUserId())!=null){
                int letterid=letterMsg.getLetterId();
                int userid=letterMsg.getToUserId();
                int nums=letterMsgService.queryNoReadLetterMsg(letterid,userid);
                LetterNoRead res=new LetterNoRead(letterid,nums,letterMsg);
                SessionData.getNoRead_letter_socket().get(letterMsg.getLetterId()+"-"+letterMsg.getToUserId()).sendMessage(new TextMessage(mapper.writeValueAsString(res)));
            }
            session.sendMessage(new TextMessage(mapper.writeValueAsString(letterMsg)));
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        int userid=(Integer)session.getAttributes().get("userid");
        SessionData.getLettermsg_socket().put(userid,session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        int userid=(Integer)session.getAttributes().get("userid");
        SessionData.getLettermsg_socket().remove(userid);
    }
}
