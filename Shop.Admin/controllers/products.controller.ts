import {Router, Request, Response} from "express";
import {getProducts} from "../models/products.model";
import {IProductSearchFilter} from "@Shared/types";

export const productsRouter = Router();

const throwServerError = (res: Response, e: Error) => {
    console.debug(e.message);
    res.status(500);
    res.send("Something went wrong");
}

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.render("products", {items: products});
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/search', async (
    req: Request<{}, {}, {}, IProductSearchFilter>,
    res: Response
) => {
    try {
        const products = await searchProducts(req.query);
        res.render("products", {
            items: products,
            queryParams: req.query
        });
    } catch (e) {
        throwServerError(res, e);
    }
});