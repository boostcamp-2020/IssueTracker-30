const query = {
    getIssue: `select I.ID as issueId, I.userId, I.title as issueTitle, I.content, writingTime, status, milestoneId, M.title as milestoneTitle
    from issue I left join milestone M on M.ID = I.milestoneId;`,
    getUserId: `select userId from user where userId=?;`,
    getlabelIssue: `SELECT issueId, labelId, content, color FROM labelIssueRelation LI, label L WHERE LI.labelId = L.ID;`,
    getassignIssue: `SELECT assignId, issueId FROM assignIssueRelation;`,
    insertUser: `INSERT INTO user (userId, userPw) VALUES (?, ?);`,
    loginCheck: `select userId, userPw from user where userId=?;`,
    getComment: `select C.ID, C.userId as commentUserId, C.writingTime as commentWritingTime, C.comment 
    from (select commentId from issue I, issueCommentRelation IC where I.ID=? and I.ID = IC.issueId) a1, comment C 
    where a1.commentId = C.ID;`,
    insertIssue: `INSERT INTO issue (userId, title, writingTime, status, milestoneId, content) values (?,?,?,?,?,?);`,
    insertLabelIssueRelation: `INSERT INTO labelIssueRelation (issueId, labelId) values (?,?);`,
    updateIssue: `UPDATE issue SET userId=?, title=?, writingTime=?, status=?, milestoneId=?, content=? WHERE ID = ?;`,
    insertComment: `INSERT INTO comment (userId, writingTime, comment) values (?,?,?);`,
    insertIssueCommentRelation: `INSERT INTO issueCommentRelation (issueId, commentId) values (?,?);`,
    updateComment: `UPDATE comment SET comment=?, writingTime=? WHERE ID = ?;`,
    deleteComment: `DELETE FROM comment WHERE ID = ?`,
    getUser: `select userId from user`,
    getLabel: `SELECT ID, content, color FROM label`,
    getMilestone: `SELECT ID, title, dueDate, description FROM milestone`,
}

module.exports = query;