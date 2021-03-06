package jmt.com.myapplication.models;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.ServerValue;

import java.util.Map;

public class Message {

    public final static String TEXT = "TEXT";
    public final static String IMAGE = "IMAGE";
    public final static String FILE = "FILE";

    private String id;
    private String content;
    private String fileURL;
    private User sender;
    private Long timestamp;
    private String type;

    public Message(String id, String content, User sender, String type) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.type = type;
    }

    public Message(String id, String content, String fileURL, User sender, String type) {
        this.id = id;
        this.content = content;
        this.fileURL = fileURL;
        this.sender = sender;
        this.type = type;
    }

    public Message() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFileURL() {
        return fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Map<String, String> getTimestamp() {
        return ServerValue.TIMESTAMP;
    }

    @Exclude
    public Long getTimestampLong() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}


