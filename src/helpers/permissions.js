import { rules } from './rbacRules';
import * as authHelper from './authService';

const Permission = props =>
    checkPermission(rules, props.perform)
        ? props.yes()
        : props.no();

Permission.defaultProps = {
    yes: () => null,
    no: () => null
};
const checkPermission = (rules, action) => {

    const permission = authHelper.loggedIn() ? rules[authHelper.getProfile().user.role_id] : false;

    if (!permission) {
        return false;
    }
    if (permission[action]) {
        return true;
    }
    return false;
}

export default Permission;
