class MembershipUtil {
    static generateMembershipNumber(id) {
        const prefix = "MEM";
        const year = new Date().getFullYear(); 
        const month = new Date().getMonth();
        const formattedId = String(id).padStart(6, "0"); 
        return `${prefix}${year}${month}${formattedId}`;
    }
}

module.exports = MembershipUtil;
