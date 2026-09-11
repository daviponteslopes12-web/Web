import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 320px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    border: 1px solid #e5e5e5;
    border-radius: 8px;

    background-color: #fff;
`;

export const Titulo = styled.h2`
    font-size: 18px;
    font-weight: 600;
    margin: 0;
`;

export const Descricao = styled.p`
    margin: 0;
    font-size: 14px;
    color: #666;
`;

export const Status = styled.span`
    font-size: 12px;
    color: #555;
`;