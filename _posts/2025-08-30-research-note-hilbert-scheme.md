---
title: "Research Note: Hilbert Scheme"
date: 2025-08-18
categories:
  - Physics
tags:
  - Hilbert scheme
  - torsion-free sheaf
  - algebraic geometry
layout: protected
protected: true
password_hash: "af7a3cc6b7617d07cb2d436c53b8398ba0a97cd19b183bea37d4cbedb2c066d1"
excerpt: "An introduction to the Hilbert scheme of points and its relation to rank-one torsion-free sheaves."
---

# Hilbert Scheme of Points

## Rank-one torsion-free sheaves

On a smooth projective surface $X$, a rank-one torsion-free sheaf $F$ is something that is "almost" a line bundle, but it may fail to be locally free at finitely many points. Equivalently, 

$$
F \cong L \otimes I_Z,
$$

where 

- $L$ is a line bundle (invertible sheaf),
- $I_Z$ is the ideal sheaf of (zero-dimensional) subscheme $Z \subset X$.

A rank-one torsion-free sheaf is just a line bundle, but with some “points” (zero-dimensional subscheme) inserted as singularities.

The ideal sheaf $I_Z$ is the sheaf of functions on $X$ that vanish along $Z$.
In other words:

$$
I_Z(U)=\left\{f \in \mathcal{O}_X(U)|f|_{U \cap Z}=0\right\},
$$

for every open set $U \subseteq X$.
So $I_Z$ is literally the sheaf of functions that vanish on $Z$.

1. Point at $0$ in $\mathbb{A}^1$:

- $X = \text{Spec} \mathbb{C}[x]$,
- $Z = \{0\}$,
- $I_Z = (x)$.

2. Two points $\{0,1\}$

- $I_Z = (x(x - 1))$

3. Fat point at $0$ of length $2$:

- $I_Z = (x^2)$
- $I_Z(U)$ consists of functions whose Taylor expansion at $0$ has vanishing constant and linear terms.

We have the following exact sequence:
The ideal sheaf $I_Z$ is defined by the exact sequence

$$
0 \rightarrow I_Z \rightarrow \mathcal{O}_X \rightarrow \mathcal{O}_Z \rightarrow 0
$$

where $\mathcal{O}_Z$ is the structure sheaf of $Z$.

## Hilbert Scheme of Points

The length of $Z, \ell(Z)$, is the number of points counted with multiplicity.

The collection of all such subschemes $Z$ of length $n$ is the Hilbert scheme of $n$ points, denoted:

$$
X^{[n]}:=\{Z \subset X \mid \ell(Z)=n\} .
$$

We have 

$$
\left\{\text { rank-one torsion-free sheaves with fixed } c_1 \text { and } c_2=n\right\} \simeq\left\{L \otimes I_Z \mid Z \in X^{[n]}\right\}
$$

## Moduli Space of rank-two sheaf splitting:

Now go back to your rank-two sheaf splitting:

$$
E \cong\left(L_1 \otimes I_{Z_1}\right) \oplus\left(L_2 \otimes I_{Z_2}\right) .
$$

- Here $Z_1 \in X^{\left[q_1\right]}, Z_2 \in X^{\left[q_2\right]}$.
- The second Chern class is additive:

$$
c_2(E)=\ell\left(Z_1\right)+\ell\left(Z_2\right)=q_1+q_2 .
$$


For fixed $c_1(L_1)$ and $c_2(L_2)$, 
the moduli space of such split sheaves is

$$
\prod_{q_1+q_2=d} X^{\left[q_1\right]} \times X^{\left[q_2\right]} .
$$

## Physical Interpretation

From the gauge theory point of view:
- $X^{[n]}$ is the instanton moduli space of charge $n$ for a $U(1)$ gauge theory on $X$.
- The rank-two case reduces to two copies of $U(1)$, hence the product of two Hilbert schemes.
- The decomposition $d=q_1+q_2$ is literally the splitting of instanton charge between the two $U(1)$ factors.