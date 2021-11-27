package com.example.testlocal.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    //endpoint 등록
    //연결시 CORS(CrossOrigin) 허용
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket","websocket2").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub"); //app
        registry.enableSimpleBroker("/sub"); //topic
        //registry.setApplicationDestinationPrefixes("/app"); //app
        //registry.enableSimpleBroker("/topic"); //topic
    }

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

//    public class HttpHandshakeInterceptor implements HandshakeInterceptor {
//
//        @Override
//        public boolean beforeHandshake(org.springframework.http.server.ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//            if (request instanceof ServletServerHttpRequest) {
//                ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
//                HttpSession session = servletRequest.getServletRequest().getSession();
//                attributes.put("roomId", session.getAttribute("roomId"));
//            }
//            return true;
//        }
//
//        @Override
//        public void afterHandshake(org.springframework.http.server.ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
//
//        }
//    }
}
