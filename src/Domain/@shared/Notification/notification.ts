export type NotificationErrorProps = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    public addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    public messages(context?: string): string {
        let messages = "";
        this.errors.forEach(error => {
            if (context == undefined || error.context === context) {
                messages += `${error.context}: ${error.message}, `;
            }
        });
        return messages;
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }

    public getErrors(): NotificationErrorProps[] {
        return this.errors;
    }

    public errorsCount(): number {
        return this.errors.length;
    }

    public clear() {
        this.errors = [];
    }

}