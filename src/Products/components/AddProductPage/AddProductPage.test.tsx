import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddProductPage from "./AddProductPage";

describe("AddProductPage", () => {
  it("should render nume produs textfield", () => {
    render(<AddProductPage />);

    const productNameInput = screen.getByLabelText(/nume produs/i);
    expect(productNameInput).toBeDefined();
  });

  it("should render pret textfield", () => {
    render(<AddProductPage />);

    const priceInput = screen.getByLabelText(/pret/i);
    expect(priceInput).toBeDefined();
  });

  it("should render inStock checkbox", () => {
    render(<AddProductPage />);

    const inStockCheckbox = screen.getByRole("checkbox");
    screen.debug();
    expect(inStockCheckbox).toBeDefined();
  });

  it("should render upload button", () => {
    render(<AddProductPage />);

    const uploadBtn = screen.getByRole("button", { name: /upload/i });
    expect(uploadBtn).toBeDefined();
  });

  it("should change nume produs field to specific value", () => {
    render(<AddProductPage />);

    const productNameInput = screen.getByLabelText(/nume produs/i) as any;
    fireEvent.change(productNameInput, { target: { value: "cartofi" } });

    expect(productNameInput.value).toBe("cartofi");
  });

  it("should change pret field to specific value", () => {
    render(<AddProductPage />);

    const priceInput = screen.getByLabelText(/pret/i) as any;
    fireEvent.change(priceInput, { target: { value: "10" } });

    expect(priceInput.value).toBe("10");
  });

  it("should change inStock checkbox to true", () => {
    render(<AddProductPage />);

    const inStockCheckBox = screen.getByRole("checkbox") as any;
    fireEvent.click(inStockCheckBox);

    expect(inStockCheckBox.value).toBe("on");
  });
});
