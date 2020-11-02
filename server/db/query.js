const query = {
    getIssue: `select a1.issueId, a1.userId, a1.labelId, a1.issueTitle, a1.writingTime, a1.status, a1.milestoneId, a1.milestoneTitle, a2.content, a2.color
    from (select I.ID as issueId, I.userId, L.labelId as labelId, I.title as issueTitle, writingTime, status, milestoneId, M.title as milestoneTitle 
    from issue I, labelIssueRelation L, milestone M 
    where L.issueId = I.ID and M.ID = I.milestoneId) a1, label a2 where a1.labelId = a2.ID;`,
    getUserId: `select userId from user where userId=?;`,
    insertUser: `INSERT INTO user (userId, userPw) VALUES (?, ?);`,
    loginCheck: `select userId, userPw from user where userId=?;`,
    getContent: `select a1.content, comment from (select content, commentId from issue I, issueCommentRelation IC where I.ID=? and I.ID = IC.issueId) a1, comment C 
    where a1.commentId = C.ID;`,
    insertIssue: `INSERT INTO issue (userId, title, writingTime, status, milestoneId, content) values (?,?,?,?,?,?);`,
    insertLabelIssueRelation: `INSERT INTO labelIssueRelation (issueId, labelId) values (?,?);`,
    updateIssue: `UPDATE issue SET userId=?, title=?, writingTime=?, status=?, milestoneId=?, content=? WHERE ID = ?;`,
    insertComment: `INSERT INTO comment (writingTime, comment) values (?,?);`,
    insertIssueCommentRelation: `INSERT INTO issueCommentRelation (issueId, commentId) values (?,?);`,
}

module.exports = query;