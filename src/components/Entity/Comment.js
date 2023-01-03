export class Comment {

    /** @type {String} */
    content

    /** @type {number} */
    fatherCommentId

    /** @type {number} */
    userId

    /** @type {number} */
    sessionId

    /** @type {String} */
    commentDate

    constructor(content, fatherCommentId, userId, sessionId, commentDate) {
        this.content = content
        this.fatherCommentId = fatherCommentId
        this.userId = userId
        this.sessionId = sessionId
        this.commentDate = commentDate
    }
}