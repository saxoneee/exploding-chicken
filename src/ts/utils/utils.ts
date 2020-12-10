export default class Utils {
    /**
     * generate a random number between min and max
     * 
     * @param min 
     * @param max 
     */
    static getRandom = function(min:number, max:number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}