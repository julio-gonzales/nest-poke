

//aqui va la definicion de la clase adaptadora que se requiera en cualquier otro servicio

export interface HttpAdapter{

    get<T>(url: string): Promise<T>;
}