export var convertTree=(tree)=>{
	let evaluateList=[];
	tree.map(item=>{
		let evaluate={
			id:item.id,
			userId:item.userId,
			nickname:item.nickName,
			headUrl:item.headUrl,
			content:item.content,
			time:item.inTime,
			identityType:item.identityType,
			memberGrade:item.memberGrade,
			isAuthor:item.isAuthor,
			replyList:[],
		};
		
		if(item.children&&item.children.length>0){
			let findNext=(parent)=>{
				parent.children.map(child=>{
					evaluate.replyList.push({
						id:child.id,
						userId:child.userId,
						nickname:child.nickName,
						headUrl:child.headUrl,
						content:child.content,
						isAuthor:child.isAuthor,
						time:child.inTime,
						identityType:child.identityType,
						memberGrade:child.memberGrade,			
						toUserId:parent.userId,
						toNickname:parent.nickName,
						toHeadUrl:parent.headUrl,
					});
					if(child.children&&child.children.length>0){
						findNext(child);
					}
				})
			}
			findNext(item);
		}
		evaluateList.push(evaluate);
	});
	
	return evaluateList;
}