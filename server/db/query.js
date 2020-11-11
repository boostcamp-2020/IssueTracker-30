const query = {
    getIssue: `select I.ID as issueId, I.userId, I.title as issueTitle, I.content, writingTime, I.status, milestoneId, M.title as milestoneTitle
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
    insertLabelIssueRelation: `INSERT INTO labelIssueRelation values (?,?);`,
    insertassignIssueRelation: `INSERt INTO assignIssueRelation values (?,?);`,
    updateIssueTitle: `UPDATE issue SET title=? WHERE ID = ?;`,
    updateIssueContent: `UPDATE issue SET content=? WHERE ID = ?;`,
    updateIssueMilestone: `UPDATE issue SET milestoneId=? WHERE ID = ?;`,
    updateIssueStatus: `UPDATE issue SET status=? WHERE ID = ?;`,
    deleteAssignIssueRelation: `DELETE FROM assignIssueRelation WHERE issueID = ?;`,
    updateAssignIssueRelation: `INSERT INTO assignIssueRelation values(?, ?);`,
    deleteLabelIssueRelation: `DELETE FROM labelIssueRelation WHERE issueID = ?;`,
    updateLabelIssueRelation: `INSERT INTO labelIssueRelation values(?, ?);`,
    insertComment: `INSERT INTO comment (userId, writingTime, comment) values (?,?,?);`,
    insertIssueCommentRelation: `INSERT INTO issueCommentRelation (issueId, commentId) values (?,?);`,
    updateComment: `UPDATE comment SET comment=?, writingTime=? WHERE ID = ?;`,
    deleteComment: `DELETE FROM comment WHERE ID = ?`,
    getUser: `select userId, imageURL from user`,
    getLabel: `SELECT ID, content, color, description FROM label`,
    getMilestone: `SELECT ID, title, dueDate, description, status FROM milestone`,
    insertUserImage: `UPDATE user SET imageURL = ? WHERE userId = ? `,
    insertLabel: `INSERT INTO label (content, color, description) VALUES (?,?,?);`,
    updateLabel: `UPDATE label SET content=?, color=?, description=? WHERE ID = ?;`,
    deleteLabel: `DELETE FROM label WHERE ID=?;`,
    insertMilestone: `INSERT INTO milestone (title, dueDate, description, status) VALUES (?,?,?,?);`,
    updateMilestone: `UPDATE milestone SET title=?, dueDate=?, description=?, status=? WHERE ID = ?;`,
    deleteMilestone: `DELETE FROM milestone WHERE ID=?;`,
};

module.exports = query;
